Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }
  resource :users, only: [:show]
  root 'static_pages#index'
end
