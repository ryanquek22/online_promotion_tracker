from django.urls import path
from .views import EventListView, EventDetailView, events_list_view

app_name = 'tracker'

urlpatterns = [
    path('', events_list_view, name='event-list'),
    path('<pk>/', EventDetailView.as_view(), name='event-detail'),
]