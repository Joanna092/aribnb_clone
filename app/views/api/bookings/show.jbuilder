# frozen_string_literal: true

json.booking do
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.user booking.user.username
    json.email booking.user.email
    json.paid booking.is_paid?

 json.property do
      json.id booking.property.id
      json.title booking.property.title
    #  json.city booking.property.city
    #  json.price_per_night booking.property.price_per_night

      if booking.property.images.any?
        json.image_url url_for(booking.property.images.slice(-1))
      else
        json.image_url booking.property.image_url
      end

    end
  end

json.user do
  json.id @property.user.id
  json.username @property.user.username
end
