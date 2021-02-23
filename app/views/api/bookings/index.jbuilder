# frozen_string_literal: true

json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.user booking.user.username
    json.email booking.user.email
    json.paid booking.is_paid?

    json.property do
      json.id booking.property.id
      json.title booking.property.title

      if booking.property.images.any?
        json.image_url url_for(booking.property.images.slice(-1))
      else
        json.image_url booking.property.image_url
      end

    end
  end
end
