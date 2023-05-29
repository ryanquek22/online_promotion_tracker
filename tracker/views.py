from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import ListView, DetailView
from .models import Event
from .scrape import scrape

import time
# Create your views here.

def index(request):
    return HttpResponse('Hello, World!')

def events_list_view(request):
    context = {}
    
    for obj in Event.objects.all():
        print(obj.when_ms)
        #print(scrape())
        if (obj.when_ms <= round(time.time() * 1000)):
            print('Scraping in progress')
            obj.when_ms = scrape() 
            obj.save()
            
    context["object_list"] = Event.objects.all()
    return render(request, "events/main.html", context)

class EventListView(ListView):
    model = Event
    template_name = 'events/main.html'

class EventDetailView(DetailView):
    model = Event
    template_name = 'events/countdown.html'