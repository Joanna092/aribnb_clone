# frozen_string_literal: true

module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date] })
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def index_by_user
      @bookings = Booking.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @bookings

      user = User.find_by(username: params[:username])

      if user
        @bookings = user.bookings.reverse
        render 'api/bookings/index', status: :ok
      else
        render json: { bookings: [] }
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found unless property

      @bookings = property.bookings.where('end_date > ? ', Date.today)
      render 'api/bookings/index'
    end

    def show
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @booking

      render 'api/bookings/show', status: :ok
    end

    def destroy
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      @booking = Booking.find_by(id: params[:id])

      if !session
        render json: { success: false }
      elsif @booking&.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date, :user, :is_paid?)
    end
  end
end
