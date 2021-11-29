# Rebuild hosts files
# The first arguement specifies the executable to be used.
# echo ip addr for reuse in other scripts

#shopt -s expand_aliases
alias v=$DEFAULT_VAGRANT
outfile='../test_hosts.ini'

rm $outfile
echo '# This is an autogenerated file.'>$outfile

echo '[my_runner]'>>$outfile
addr1=$(v ssh gitlab-runner -c "ip address show eth0 | grep 'inet ' | sed -e 's/^.*inet //' -e 's/\/.*$//'")
echo $addr1
echo $addr1    ansible_connection=ssh    ansible_user=ansible>>$outfile

echo '[my_server]'>>$outfile
addr2=$(v ssh app-runner -c "ip address show eth0 | grep 'inet ' | sed -e 's/^.*inet //' -e 's/\/.*$//'")>>$outfile
echo $addr2
echo $addr2    ansible_connection=ssh    ansible_user=ansible>>$outfile
