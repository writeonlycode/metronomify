Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  devise_scope :user do
    get '/users', to: 'users/sessions#show', as: ''
  end

  root 'static_pages#index'
end
