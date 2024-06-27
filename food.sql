CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(15)
);

CREATE TABLE restaurant(
  res_id INT PRIMARY KEY AUTO_INCREMENT,
  res_name VARCHAR(100),
  Image VARCHAR(500),
  `desc` VARCHAR(1000)
);


CREATE TABLE rate_res(
  user_id INT,
  res_id INT,
  PRIMARY KEY(user_id, res_id),
  amount INT,
  date_rate DATETIME,
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE like_res (
  user_id INT,
  res_id INT,
  PRIMARY KEY(user_id, res_id),
  date_like DATETIME,
  FOREIGN KEY(user_id) REFERENCES user(user_id),
  FOREIGN KEY(res_id) REFERENCES restaurant(res_id)
);

CREATE TABLE food_type (
  type_id INT PRIMARY KEY AUTO_INCREMENT,
  type_name VARCHAR(30)
);

CREATE TABLE food (
  food_id INT PRIMARY KEY AUTO_INCREMENT,
  food_name VARCHAR(30),
  image VARCHAR(500),
  price FLOAT,
  `desc` VARCHAR(1000),
  type_id INT,
  FOREIGN KEY(type_id) REFERENCES food_type(type_id)
);

CREATE TABLE sub_food(
  sub_id INT PRIMARY KEY AUTO_INCREMENT,
  sub_name VARCHAR(30),
  sub_price FLOAT,
  food_id INT,
  FOREIGN KEY(food_id) REFERENCES food(food_id)
);

CREATE TABLE `order` (
  user_id INT,
  food_id INT,
  PRIMARY KEY(user_id,food_id),
  amount INT,
  code VARCHAR(20),
  arr_sub_id VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);


-- Thêm dữ liệu
-- Thêm 10 bản ghi dummy data cho user
INSERT INTO user (full_name, email, password) VALUES
('John Doe', 'john.doe@example.com', 'password1'),
('Jane Smith', 'jane.smith@example.com', 'password2'),
('Michael Johnson', 'michael.johnson@example.com', 'password3'),
('Emily Brown', 'emily.brown@example.com', 'password4'),
('David Wilson', 'david.wilson@example.com', 'password5'),
('Sarah Taylor', 'sarah.taylor@example.com', 'password6'),
('Chris Evans', 'chris.evans@example.com', 'password7'),
('Amanda Lee', 'amanda.lee@example.com', 'password8'),
('Matthew Clark', 'matthew.clark@example.com', 'password9'),
('Laura Martinez', 'laura.martinez@example.com', 'password10');

-- Thêm dummy data cho restaurant
INSERT INTO restaurant (res_name, Image, `desc`) VALUES
('Restaurant A', 'image1.jpg', 'Description for Restaurant A'),
('Restaurant B', 'image2.jpg', 'Description for Restaurant B'),
('Restaurant C', 'image3.jpg', 'Description for Restaurant C'),
('Restaurant D', 'image4.jpg', 'Description for Restaurant D'),
('Restaurant E', 'image5.jpg', 'Description for Restaurant E'),
('Restaurant F', 'image6.jpg', 'Description for Restaurant F'),
('Restaurant G', 'image7.jpg', 'Description for Restaurant G');

-- Thêm dummy data cho rate_res
INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, NOW()),
(2, 1, 4, NOW()),
(3, 2, 3, NOW()),
(4, 2, 5, NOW()),
(5, 3, 4, NOW()),
(6, 3, 3, NOW()),
(7, 4, 5, NOW());

-- Thêm dummy data cho bảng like_res
INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, NOW()),
(2, 1, NOW()),
(3, 2, NOW()),
(3, 1, NOW()),
(3, 3, NOW()),
(3, 4, NOW()),
(4, 2, NOW()),
(4, 1, NOW()),
(5, 3, NOW()),
(6, 3, NOW()),
(6, 1, NOW()),
(6, 2, NOW()),
(7, 4, NOW()),
(7, 3, NOW()),
(1,5,NOW());

-- Thêm dummy data cho bảng food_type
INSERT INTO food_type (type_name) VALUES
('Vietnamese'),
('Italian'),
('Japanese'),
('Mexican'),
('Chinese');

-- Thêm dummy data cho bảng food
INSERT INTO food (food_name, image, price, `desc`, type_id) VALUES
('Pho', 'pho.jpg', 5.99, 'Traditional Vietnamese noodle soup', 1),
('Pizza', 'pizza.jpg', 8.99, 'Italian dish consisting of a yeasted flatbread', 2),
('Sushi', 'sushi.jpg', 12.99, 'Japanese dish of prepared vinegared rice', 3),
('Taco', 'taco.jpg', 6.99, 'Mexican dish consisting of a corn or wheat tortilla', 4),
('Dumplings', 'dumplings.jpg', 7.99, 'Chinese dish made from dough wrapped around a filling', 5);

-- Thêm dummy data cho bảng sub_food
INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Spring Rolls', 4.99, 1),
('Garlic Bread', 3.99, 2),
('Miso Soup', 2.99, 3),
('Guacamole', 2.49, 4),
('Fried Wontons', 4.49, 5);

-- Thêm dummy data cho bảng `order`
INSERT INTO `order` (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ABC123', '1,2'),
(2, 3, 1, 'DEF456', '3'),
(3, 5, 3, 'GHI789', '4,5'),
(4, 2, 2, 'JKL012', '2'),
(3, 4, 1, 'MNO345', '3,4'),
(3, 1, 1, 'MNO345', '3,4');


-- 5 người có lượt like nhà hàng nhiều nhất 
SELECT 
    user.user_id, 
    user.full_name,
    user.email,
    COUNT(like_res.res_id) AS num_likes
FROM 
    user
JOIN 
    like_res ON user.user_id = like_res.user_id
GROUP BY 
    user.user_id, 
    user.full_name
ORDER BY 
    num_likes DESC
LIMIT 
    5;


-- 2 nhà hàng có  lượt like  nhiều nhất 
SELECT 
    restaurant.res_id, 
    restaurant.res_name, 
    COUNT(*) AS num_likes
FROM 
    like_res
JOIN 
    restaurant ON like_res.res_id = restaurant.res_id
GROUP BY 
    restaurant.res_id, 
    restaurant.res_name
ORDER BY 
    num_likes DESC
LIMIT 
    2;

-- người đặt hàng nhiều nhất
SELECT 
    o.user_id, 
    u.full_name,
    u.email,
    COUNT(*) AS num_orders
FROM 
    `order` AS o
JOIN 
    user AS u ON o.user_id = u.user_id
GROUP BY 
    o.user_id,
    u.full_name
ORDER BY 
    num_orders DESC
LIMIT 
    1;

-- người dùng không hoạt động trong hệ thống
SELECT 
    user.user_id, 
    user.full_name,
    user.email
FROM 
    user
LEFT JOIN 
    rate_res ON user.user_id = rate_res.user_id
LEFT JOIN 
    like_res ON user.user_id = like_res.user_id
LEFT JOIN 
    `order` AS o ON user.user_id = o.user_id
WHERE 
    rate_res.user_id IS NULL
    AND like_res.user_id IS NULL
    AND o.user_id IS NULL;