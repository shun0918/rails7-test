Rails.application.routes.draw do
  # ROUTING
  get "/registrations", to: "registrations#index"
  get "/users", to: "users#index"
  get "/login", to: "registrations#index"
  get "/tasks", to: "tasks#index"

  # API
  get "/users/show", to: "users#show"
  get "/users/me", to: "users#me"
  post "/users/me", to: "users#update"
  post "/registrations/signup", to:"registrations#create"
  get "/tasks/show", to:"tasks#show"

  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "registrations#index"
end
