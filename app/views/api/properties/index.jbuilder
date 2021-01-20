# frozen_string_literal: true

json.total_pages @properties.total_pages
json.next_page @properties.next_page

json.properties do
  json.array! @properties do |property|
    json.id property.id
    json.title property.title
    json.city property.city
    json.country property.country
    json.property_type property.property_type
    json.price_per_night property.price_per_night
    json.image_url property.image_url

    if property.image.attached?
      json.image url_for(property.image)
    else
      json.image nil
    end
  end
end

 #   json.images do
 #     json.array! property.images do |image|
 #       json.image_url url_for(image)
 #     end
 #   end
  

