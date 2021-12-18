ansible-playbook playbook.yaml -i test_hosts.ini --tags dockerhub-push --extra-vars '{ "push_to_dockerhub" : true }' --ask-vault
