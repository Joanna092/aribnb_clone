# frozen_string_literal: true

json.booking do
    json.id @booking.id
    json.start_date @booking.start_date
    json.end_date @booking.end_date
    json.user @booking.user.username
    json.email @booking.user.email
    json.paid @booking.is_paid?

 json.property do
      json.id @booking.property.id
      json.title @booking.property.title
      json.city @booking.property.city
      json.price_per_night @booking.property.price_per_night
      json.description @booking.property.description
      json.country @booking.property.country
      json.property_type @booking.property.property_type
      json.max_guests @booking.property.max_guests
      json.bedrooms @booking.property.bedrooms
      json.beds @booking.property.beds
      json.baths @booking.property.baths

      if @booking.property.images.any?
        json.image_url url_for(@booking.property.images.slice(-1))
      else
        json.image_url @booking.property.image_url
      end

json.user do
  json.id @booking.property.user.id
  json.username @booking.property.user.username
end


    end
  end


