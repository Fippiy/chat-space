# README

## users Table

|Column|Type|Options|
|------|----|-------|
|email|string|null_false, unique: true|
|nickname|string|null_false, unique: true,index: true|

### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users

## messages Table

|Column|Type|Options|
|------|----|-------|
|text|text|null_false|
|user_id|references|foreigh_key: true, null_false|
|group_id|references|foreigh_key: true, null_false|

### Association
- belongs_to :user
- belongs_to :group

## groups Table

|Column|Type|Options|
|------|----|-------|
|name|string|null_false, unique: true|

### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users

## group_user Table

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreigh_key: true, null_false|
|group_id|references|foreigh_key: true, null_false|

### Association
- belongs_to :user
- belongs_to :group

