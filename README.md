# README

## users Table

|Column|Type|Options|
|------|----|-------|
|email|string|null_false, unique: true|
|encrypted_password|string|null_false|
|reset_password_token|string||
|reset_password_sent_at|datetime||
|remember_created_at|datetime||
|created_at|datetime|null_false|
|updated_at|datetime|null_false|
|nickname|string|null_false, unique: true,index: true|

### Association
- has_many :messages
- has_many :group_users

## messages Table

|Column|Type|Options|
|------|----|-------|
|text|text|null_false|
|user_id|integer|references, foreigh_key: true|
|group_id|integer|references, foreigh_key: true|
|created_at|datetime|null_false|
|updated_at|datetime|null_false|

### Association
- belongs_to :user
- belongs_to :group

## groups Table

|Column|Type|Options|
|------|----|-------|
|name|string|null_false,unique: true|
|created_at|datetime|null_false|
|updated_at|datetime|null_false|

### Association
- has_many :messages
- has_many :group_users

## group_user Table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|references, foreigh_key: true|
|group_id|integer|references, foreigh_key: true|

### Association
- belongs_to :user
- belongs_to :group
