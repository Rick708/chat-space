# frozen_string_literal: true
class DeviseCreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name,               null: false, unique: true, index: true
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
  end
end