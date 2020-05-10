Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }
  root to: 'pages#home'

<<<<<<< HEAD
  # get "test", to: "pages#test"
=======
  get "test", to: "pages#test"
>>>>>>> f2aea6491c7b4557c9799177dd46b2883d2f5a3d

  resources :users, only: [:show]

  resources :matches

  resources :user_events, only:[:index]

  resources :groups

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
