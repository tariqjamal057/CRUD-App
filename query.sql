create database greverence_app;
use greverence_app;

create  table tmdept (
	did int not null auto_increment,
    dname varchar(50),
    constraint pk_did primary key(did)
);

create table ttpdetail (
	pid varchar(10),
	pname varchar(50),
	pdept int,
	pwd varchar(10),
	prole varchar(2),
    constraint pk_pid primary key(pid),
    constraint fk_pdept foreign key(pdept) references tmdept(did)
);

create table tmcategory (
	cid int not null auto_increment,
    category varchar(50),
    eid varchar(10),
    constraint pk_cid primary key(cid),
    constraint fk_eid foreign key(eid) references ttpdetail(pid)
);

create table ttcomplaint (
	cid int,
    ccat int,
    description varchar(50),
    status varchar(2),
    constraint pk_comid primary key(cid),
    constraint fk_ccat foreign key(ccat) references tmcategory(cid)
);

