# frozen_string_literal: true

module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/index', status: :ok
    end

    def index_by_user
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      user = User.find_by(username: params[:username])

      if user
        @properties = user.properties.reverse
        render 'api/properties/index_by_user', status: :ok
      else
        render json: { properties: [] }
      end
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      if session
        user = session.user
        @property = user.properties.new(properties_params)

        if @property.save
          render json: {
            property:
              {
                username: user.username,
                title: @property.title,
                description: @property.description,
                country: @property.country,
                city: @property.city,
                property_type: @property.property_type,
                price_per_night: @property.price_per_night,
                max_guests: @property.max_guests,
                bedrooms: @property.bedrooms,
                beds: @property.beds,
                baths: @property.baths
              }
          }
        else
          render json: { success: false }
        end
      end
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end

    private

    def properties_params
      params.require(:property).permit(:title, :description, :city, :country, :price, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :property_type)
    end
  end
end
