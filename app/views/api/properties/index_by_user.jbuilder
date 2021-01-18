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
    json.image_url property.image_url

  #  json.images do
  #    json.array! property.images do |image|
   #     json.image_url url_for(image)
   #   end
  #  end
  end
end
