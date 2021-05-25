//smt 테이블 생성
CREATE TABLE smt
( id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
date TIMESTAMP DEFAULT NOW(),
line char(3) NOT NULL, 
amodel char(100) NULL,
atarget int NULL,
aproduction int NULL,
bmodel char(100) NULL,
btarget int NULL,
bproduction int NULL,
cmodel char(100) NULL,
ctarget int NULL,
cproduction int NULL,
dmodel char(100) NULL,
dtarget int NULL,
dproduction int NULL,
emodel char(100) NULL,
etarget int NULL,
eproduction int NULL,
targettotal int NOT NULL,
resulttotal int NOT NULL,
achivementrate DECIMAL(8,2) NOT NULL,
updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
remarks char(230)
);

#insert 예시
insert into smt (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate) value ('A', 'A_model', 1, 1, 'B_model', 1, 1, 'C_model', 1, 1, 'D_model', 1, 1, 'E_model', 1, 1, 5, 1, 20.00);
insert into smt (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate) value ('B', 'A_model', 1, 1, 'B_model', 1, 1, 'C_model', 1, 1, 'D_model', 1, 1, 'E_model', 1, 1, 5, 1, 20.00);
insert into smt (line, amodel, atarget, aproduction, bmodel, btarget, bproduction, cmodel, ctarget, cproduction, dmodel, dtarget, dproduction, emodel, etarget, eproduction, targettotal, resulttotal, achivementrate) value ('C', 'A_model', 1, 1, 'B_model', 1, 1, 'C_model', 1, 1, 'D_model', 1, 1, 'E_model', 1, 1, 5, 1, 20.00);

#user테이블 생성
create table user
( id int NOT NULL PRIMARY KEY AUTO_INCREMENT, 
username char(200) not NULL,
name char(200) not NULL,
email char(200) not NULL,
password char(200) not NULL
)
