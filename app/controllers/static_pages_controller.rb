# frozen_string_literal: true

class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def paymentSuccess
    render 'paymentSuccess'
  end

  def userpage
    render 'userpage'
  end

  def host_home
    render 'host_home'
  end

  def host_property
    render 'host_property'
  end

  def add_property
    render 'add_property'
  end

  def property_success
    render 'property_success'
  end

end
