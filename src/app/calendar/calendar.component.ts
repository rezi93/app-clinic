import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ServService } from '../service/serv.service';
import { Ievent } from '../interface/iface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  savedEvents: any[] = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    events: this.savedEvents,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private http: HttpClient) {
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const eventData = {
        title: title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString()
      };

      if (localStorage['userData']) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post<Ievent>('https://localhost:44346/event', eventData, { headers })
          .subscribe(
            (response) => {
              console.log('Event saved successfully:', eventData);
              const eventApi = calendarApi.addEvent(eventData);
              if (eventApi) {
                eventApi.setExtendedProp('eventId', response.id);
                this.savedEvents.push(eventData);
              } else {
                console.error('Failed to add event to calendar:', eventData);
              }
            },
            (error) => {
              console.error('Error saving event:', error);
            }
          );
      } else {
        alert('User is not logged in to save the event.');
      }
    }
  }
  
  
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      this.handleEventDelete( clickInfo.event);
      
    }
  }

  
  
  
  handleEventDelete(eventData:any): void {
    const title = eventData.title;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('title', title);
  
    this.http.delete('https://localhost:44346/event', { headers, params })
      .subscribe(
        () => {
          console.log(`Event with title '${title}' deleted successfully`);
          eventData.remove();
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
  
  }


  
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get<any[]>('https://localhost:44346/events', { headers })
      .subscribe(
        (response) => {
          this.savedEvents = response;
          this.calendarOptions.events = this.savedEvents;
        },
        (error) => {
          console.error('Error retrieving events:', error);
        }
      );
  }
}
