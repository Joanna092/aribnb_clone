class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.string :token
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
