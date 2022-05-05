Rails.application.routes.draw do
  devise_for :users, skip: :all

  devise_scope :user do
    scope :users, defaults: { format: :json } do
      get '', to: 'users/sessions#show', as: ''

      # Sessions Routes
      post '/sign_in', to: 'users/sessions#create', as: 'user_session'
      delete '/sign_out', to: 'users/sessions#destroy', as: 'destroy_user_session'

      # Registrations Routes
      post '', to: 'users/registrations#create', as: ''
      patch '', to: 'users/registrations#update', as: 'user_registration'
      put '', to: 'users/registrations#update', as: ''
      delete '', to: 'users/registrations#destroy', as: ''
      get '/cancel', to: 'devise/registrations#cancel', as: 'cancel_user_registration'

      # Passwords Routes
      post '/password', to: 'users/passwords#create', as: ''
      patch '/password', to: 'users/passwords#update', as: 'user_password'
      put '/password', to: 'users/passwords#update', as: ''
    end
  end

  # The root points to the React index page.
  root 'static_pages#index'

  # The calls to the api/ are matched below.
  # If nothing is matched, return 404.
  scope :api, defaults: { format: 'json' } do
    resources :time_entries, only: %i[index show create update destroy]
    get '*path', to: proc { [404, {}, ['']] }
  end

  # Everything else gets redirected to the React entry point.
  get '*path', to: 'static_pages#index'
end
