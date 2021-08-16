# frozen_string_literal: true

json.properties do
  json.array! @properties do |property|
    json.id property.id
    json.username property.user.username
    json.title property.title
    json.city property.city
    json.country property.country
    json.property_type property.property_type
    json.price_per_night property.price_per_night

    if property.images.any?
      json.image_url url_for(property.images.slice(-1))
    else
      json.image_url property.image_url
    end

    json.bookings do
      json.array! property.bookings do |booking|
        json.id booking.id
       # json.paid booking.paid 
       json.paid booking.is_paid?
      end
    end

  end
end
