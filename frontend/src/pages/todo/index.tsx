import PrivateRoute from "@/components/PrivateRoute";
import ReactDragListView from 'react-drag-listview';
import { useState } from "react";
import { ActionIcon, Card, Container, Group, List, Paper, Text, TextInput } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconBrandHipchat, IconTrash } from '@tabler/icons-react';

export default ()=>{

  const [data, setData] = useState(() => {
    const initialData = [];
    for (let i = 1, len = 7; i < len; i++) {
      initialData.push({
        title: `rows${i}`
      });
    }
    return initialData;
  });

  const onDragEnd = (fromIndex, toIndex) => {

    //send api call to change order and then update accordingly

    notifications.show({
      title: 'Updated Succesfully',
      message: 'Row order has been updated',
    })

    const updatedData = [...data];
    const item = updatedData.splice(fromIndex, 1)[0];
    updatedData.splice(toIndex, 0, item);
    setData(updatedData);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: 'li',
    handleSelector: 'li'
  };


  return (
    <PrivateRoute>
      <Container>
      <TextInput placeholder="Ask Milo" icon={<IconBrandHipchat size="0.8rem" />} />;
      <ReactDragListView {...dragProps}>
    {data.length > 0 ? (
							data.map((task, index) => {
								if (task.title) {
									return (
                      <li style={{listStyle:'none'}}>
										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<ActionIcon
													onClick={() => {

													}}
													color={'red'}
													variant={'transparent'}>
                            <ActionIcon color="red" variant="filled"><IconTrash size="1rem" /></ActionIcon>
  												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
                      'No summary was provided for this task'											</Text>
										</Card>
                      </li>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
    </ReactDragListView>
      </Container>
    </PrivateRoute>
  )
};




