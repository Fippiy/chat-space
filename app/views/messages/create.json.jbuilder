json.text @message.text
json.image @message.image.url
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M:%S")
json.nickname @message.user.nickname
