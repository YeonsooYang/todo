
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import ListItem from "@/components/ListItem";
import { GRAY } from "../colors";
import EmptyList from "@/components/EmptyList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import List from "@/components/List";
import InputFAB from "@/components/InputFAB";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";



const ListScreen = () => {
  const {bottom} = useSafeAreaInsets();
  const [todos,setTodos] = useState([
    // {id:'1', task:'task 1', isDone: false},
    // {id:'2', task:'task 2', isDone: false},
    // {id:'3', task:'task 3', isDone: false},
    // {id:'4', task:'task 4', isDone: false},
    // {id:'5', task:'task 5', isDone: false},
    // {id:'6', task:'task 6', isDone: false},
    // {id:'7', task:'task 7', isDone: false},
    // {id:'8', task:'task 8', isDone: false},
    // {id:'9', task:'task 9', isDone: false},
    // {id:'10', task:'task 10', isDone: false},
    // {id:'11', task:'task 11', isDone: false},
  ]);

  const [isBottom, setIsBottom] = useState(false);

  const {getItem, setItem} = useAsyncStorage('todos');

  const save = async (data) => {
    try{
      await setItem(JSON.stringify(data));
      setTodos(data);
    }catch(e){
      Alert.alert('저장하기 실패','데이터 저장에 실패했습니다');
    }
  };

  const load = async () => {
    try{
      const data = await getItem();
      const todos = JSON.parse(data || '[]');
      setTodos(todos);
    }catch (e){
      Alert.alert('불러오기 실패','데이터 불러오기에 실패했습니다');
    }
  };

  useEffect(()=>{
    load();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInsert = (task) => {
    const id = nanoid();
    const newTodos = [{ id, task, isDone: false }, ...todos];
    save(newTodos);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    save(newTodos);
  }

  const onToggle = (id) => {
    const newTodos = todos.map((item)=>
    item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    save(newTodos);
  };


  return (
    <View style={{flex:1,paddingBottom:bottom}}>
      {todos.length ? (
        <List 
        data={todos} 
        setIsBottom={setIsBottom} 
        onDelete={onDelete} 
        onToggle={onToggle}
        /> 
        ):( 
        <EmptyList />
        )}
      <InputFAB onInsert={onInsert} isBottom={isBottom}/>
    </View>
  );
};


export default ListScreen;
