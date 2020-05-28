Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  root to: 'pages#home'
  # get "test", to: "pages#test"

  resources :users, only: [:show]

  get 'user_update', to: 'users#update'

  resources :matches

  resources :user_events, only:[:index]

  resources :groups

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
