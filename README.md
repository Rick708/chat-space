# DB設計

## users

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|

### Association
 - has_many :groups_users
 - has_many :groups, through: :groups_users
 - has_many :messages

## groups

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|


### Association
 - has_many :groups_users
 - has_many :users, through: :groups_users
 - has_many :messages

## groups_users

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association 
 - belongs_to :group
 - belongs_to :user


## messages テーブル

|Column|Type|Options|
|------|----|-------|
|boby|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
 - belongs_to :group
 - belongs_to :user
