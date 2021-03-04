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
      # json.image nil
      json.image_url property.image_url
    end

    if @booking.present?
      json.user booking.user.username
      json.email booking.user.email
      json.paid booking.is_paid?
    end

  end
end
