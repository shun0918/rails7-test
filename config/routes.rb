Rails.application.routes.draw do
  get "/registrations", to: "registrations#index"

  get "/registrations/show", to: "registrations#show"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "registrations#index"
end
