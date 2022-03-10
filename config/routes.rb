Rails.application.routes.draw do
  # ROUTING
  get "/registrations", to: "registrations#index"
  get "/users", to: "users#index"

  # API
  post "/registrations/signup", to:"registrations#signup"

  get "/registrations/show", to: "registrations#show"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "registrations#index"
end
