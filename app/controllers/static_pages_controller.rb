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

  def host_login
    render 'host_login'
  end

  def paymentSuccess
    @user_data = authorize
    return unless @user_data

    render 'paymentSuccess'
  end

  def userpage
    @user_data = authorize
    return unless @user_data

    render 'userpage'
  end

  def single_property
    @data = { property_id: params[:id] }.to_json
    render 'single_property'
  end

  def host_home
    @user_data = authorize_host
    return unless @user_data
    
    render 'host_home'
  end

  def host_property
    @user_data = authorize_host
    return unless @user_data

    render 'host_property'
  end

  def add_property
    @user_data = authorize_host
    return unless @user_data

    render 'add_property'
  end

  def edit_property
    @user_data = authorize_host
    return unless @user_data

    render 'edit_property'
  end

  def property_success
    @user_data = authorize_host
    return unless @user_data

    render 'property_success'
  end

  def edited_success
    @user_data = authorize_host
    return unless @user_data

    render 'edited_success'
  end

  private

  def authorize
    token = cookies.permanent.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    unless session
      redirect_to '/'
      return
    end
    session.user.to_json
  end

  def authorize_host
    token = cookies.permanent.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    unless session
      redirect_to '/hosting/hostinglogin'
      return
    end
    session.user.to_json
  end
end
