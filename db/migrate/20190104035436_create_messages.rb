class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text  :text,null: false
      t.string  :image
      t.references  :user, foreigh_key: true
      t.references  :group, foreigh_key: true
      t.timestamps
    end
  end
end
