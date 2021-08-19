
USE  shoopingdb;
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(80),
    price INT,
    description TEXT,
    image TEXT

);


USE  shoopingdb;

INSERT INTO products VALUES (null
,
"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
109.95,
"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
 "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
)


INSERT INTO products VALUES (null
,
"Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
599,
"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",

 "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
)
