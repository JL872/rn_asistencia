import AsyncStorage from "@react-native-async-storage/async-storage";
import { Estudiante } from "./tipos";

export async function almacenarEstudiante(e: Estudiante): Promise<Estudiante|null>{
    try {
        var listado: Estudiante[] | null = await obtenerEstudiantes()
        if(listado){
            listado.unshift(e)
            await AsyncStorage.setItem("asistencias", JSON.stringify(listado))
        } else {
            await AsyncStorage.setItem("asistencias", JSON.stringify([e]))
        }
        return e;
    } catch (error) {
        return null;
    }
}
export async function borrarEstudiantes():  Promise<boolean>{
    try {
        await AsyncStorage.setItem("asistencias", JSON.stringify([]))
        return true;
    } catch (error) {
        return false;
    }
}

export async function obtenerEstudiantes(): Promise<Estudiante[]|null> {
    try {
        var listadoStr: (string | null) = await AsyncStorage.getItem("asistencias")
        if(listadoStr && listadoStr !== ''){
            var listado: Estudiante[] = JSON.parse(listadoStr);
            return listado;
        } 
        return null;
    } catch (error) {
        return null;
    }
}