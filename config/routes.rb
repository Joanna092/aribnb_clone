# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/:username/yourproperty/:id' => 'static_pages#single_property'

  get '/hosting/edit/property/:id' => 'static_pages#edit_property' # display edit chosen property of a host

  get '/login' => 'static_pages#login'
  get '/hosting/hostinglogin' => 'static_pages#host_login'

  get '/booking/:id/success' => 'static_pages#paymentSuccess'
  get '/userpage' => 'static_pages#userpage'
  get '/hosting' => 'static_pages#host_property'
  #get '/hosting/host_property' => 'static_pages#host_property'
  get '/hosting/add_property' => 'static_pages#add_property'
  get '/hosting/:id/success' => 'static_pages#property_success'
  get '/hosting/:id/edited_success' => 'static_pages#edited_success'

  namespace :api do
    # Add routes below this line
    resources :users, only: %i[index show create]
    resources :sessions, only: %i[create destroy]
    resources :properties, only: %i[index show create update]
    resources :properties, only: [:create]
    resources :bookings, only: %i[index show create]
    resources :charges, only: [:create]

    delete '/logout' => 'sessions#destroy'
    delete '/properties/:id' => 'properties#destroy'
    delete '/users/:username/bookings/:id' => 'bookings#destroy'

    # edit property created by given host
    put '/properties/:id' => 'properties#edit'

    get '/logout' => 'sessions#destroy'

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'

    # display properties created by given host
    get '/users/:username/properties' => 'properties#index_by_user'

    # display bookings booked by given user
    get '/users/:username/bookings' => 'bookings#index_by_user'

    #display booking with given id
    get '/users/:username/bookings/:id' => 'bookings#show'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end
end
