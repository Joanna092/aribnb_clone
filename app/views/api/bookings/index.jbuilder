# frozen_string_literal: true

json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.user booking.user.username
  end
end

#I have to add this data to see who booked the property 

#json.user do
#  json.id booking.user.id
#  json.username booking.user.username
#end