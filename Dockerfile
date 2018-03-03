
# Choose a distribution you are comfortable with.
FROM centos:7


RUN yum -y update && \
	yum -y install epel-release && \
	yum -y install youtube-dl

CMD ["sh"]
