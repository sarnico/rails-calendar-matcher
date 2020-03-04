Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  root to: 'pages#home'

  get "test", to: "pages#test"

  resources :users, only: [:show]

  resources :matches

  resources :user_events, only:[:index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
