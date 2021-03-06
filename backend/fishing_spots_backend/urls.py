from django.urls import path, include
from fishing_spots_backend import views


urlpatterns = [
    path('', views.get_all_parks_campgrounds),
    path('all_saved_fishing_spots', views.get_all_user_fishing_spots),
    path('fishing_spot/<int:pk>', views.get_fishing_spot_by_id),
]