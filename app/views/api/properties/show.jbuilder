# frozen_string_literal: true

json.property do
#  json.username @property.user.username
  json.id @property.id
  json.title @property.title
  json.description @property.description
  json.city @property.city
  json.country @property.country
  json.property_type @property.property_type
  json.price_per_night @property.price_per_night
  json.max_guests @property.max_guests
  json.bedrooms @property.bedrooms
  json.beds @property.beds
  json.baths @property.baths
  # json.image_url @property.image_url

  if @property.images.any?
    json.image_url url_for(@property.images.slice(-1))
  else
    json.image_url @property.image_url
  end

  json.bookings do
      json.array! @property.bookings do |booking|
        json.id booking.id
        json.paid booking.is_paid?
      end
    end

end

 json.user do
   json.id @property.user.id
   json.username @property.user.username
 end
