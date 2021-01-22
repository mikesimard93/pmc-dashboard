#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Created on June 17
# @author: Samuel Hovington

import os
import sys
import json
from datetime import datetime
import asana
import harvest
from datetime import date


def fill_dict(dict, task, time):
    dict[task["name"]] = {  "gid": task["gid"],
                            "total_dependencies_time": 0.0,
                            "due_on": task["due_on"],
                            "created_at": task["created_at"],
                            "estimated_time": task["custom_fields"][2]["number_value"],
                            "completed_at": task["completed_at"],
                            "module": task["custom_fields"][0]["enum_value"]["name"],
                            "type": task["resource_subtype"],
                            "clocked_time": time
                         }

def get_child_gid(task_gid):
    result = client_asana.tasks.get_dependencies_for_task(task_gid, opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True)
    return list(result)

def recursive(task_dependencies, dict):
    total_time = 0
    time_to_add = 0
    for dependency in task_dependencies:
        dependency_time = 0
        for entry in timesheets:
            if entry["day_entry"]["notes"] == dependency["name"]:
                dependency_time += entry["day_entry"]["hours"]
        print(dependency["name"])
        if dependency["custom_fields"][2]["number_value"]:
            total_time += dependency["custom_fields"][2]["number_value"]
        # import pdb; pdb.set_trace()
        fill_dict(dict, dependency, dependency_time)
        sub_task_dependencies = get_child_gid(dependency["gid"])
        if sub_task_dependencies:
            time_to_add = recursive(sub_task_dependencies, dict[dependency["name"]])
        else:
            pass
        total_time += time_to_add 
    dict["total_dependencies_time"] = total_time
    return total_time


if len(sys.argv) > 1:
    f = open(os.path.abspath(sys.argv[1]), encoding="utf-8")
    config = json.loads(f.read())
else:
    print("No config file provided")
    exit()

# Create Asana client
client_asana = asana.Client.access_token(config['ASANA_TOKEN'])
(url, state) = client_asana.session.authorization_url()
workspace_gid = '622159997203998'

# Create Harvest client
client_harvest = harvest.Harvest("https://robotiqueudes.harvestapp.com", config['HARVEST_EMAIL'], config['HARVEST_PSSWD'])
zeus_id = 24745864
today = date.today()
start_session = date(2021, 1, 11)
start_session_datetime = datetime(2021, 1, 11)
timesheets = client_harvest.timesheets_for_project(zeus_id, start_session, today)

result = client_asana.tasks.search_tasks_for_workspace(workspace_gid, {'resource_subtype': 'milestone'},opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True)
milestones = list(result)


for task in milestones:
    if task["due_on"] != None:
        if start_session_datetime < datetime.strptime(task["due_on"], "%Y-%m-%d"):
            print("\n" + task["name"])
            custom_fields = task.get("custom_fields")
            for custom_field in custom_fields:
                if "Harvest" in custom_field["name"]:
                    enum_value = custom_field["enum_value"]
                    if enum_value != None:
                        harvest = enum_value["name"]

                        if harvest == 'Goal':

                            top_task = task

task_dependencies = get_child_gid(top_task["gid"])

tree = {}
fill_dict(tree, top_task, 0)
recursive(task_dependencies, tree[top_task["name"]])
json_object = json.dumps(tree, indent = 4)
print(json_object)