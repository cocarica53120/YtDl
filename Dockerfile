
# Choose a distribution you are comfortable with.
FROM centos:7


# Update centos
RUN yum -y update && \
	yum -y install epel-release && \
	# Install youtube-dl
	yum -y install youtube-dl &&\
	# As ffmpeg is used for decoding audio and is not in centos repo,
	rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro &&\
	rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm &&\
	# Finally, install ffmpeg
	yum install ffmpeg ffmpeg-devel -y


CMD ["sh"]
