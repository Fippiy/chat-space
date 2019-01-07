Rails.application.routes.draw do
  devise_for :users
  # root 'messages#index'
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :edit, :create, :update] do
    resources :messages, only: [:index, :create]
  end
end
