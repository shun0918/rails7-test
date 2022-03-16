Rails.application.routes.draw do
  # ROUTING
  get "/registrations", to: "registrations#index"
  get "/users", to: "users#index"
  get "/login", to: "registrations#index"

  # API
  get "/users/show", to: "users#show"
  get "/users/profile/me", to: "users#me"
  post "/users/profile/me", to: "profiles#update"
  post "/registrations/signup", to:"registrations#create"

  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "registrations#index"
end
