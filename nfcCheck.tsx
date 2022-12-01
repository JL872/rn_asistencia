import * as React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { Estudiante } from './src/tipos';
import { almacenarEstudiante, borrarEstudiantes, obtenerEstudiantes } from './src/Almacenamiento';
import NfcManager, { NfcEvents, TagEvent, Ndef } from 'react-native-nfc-manager';

var emojis = ['🦁', '🐹', '🦝', '🦊', '🐮', '🐷', '🐼']

function ReglonEstudiante({ item }: { item: Estudiante }) {
  return (<View style={estilos.reglonEstudiante}>
    <View>
      <Text style={{ fontSize: 30, marginRight: 10 }}>
        {item.emoji}
      </Text>
    </View>
    <View>
      <Text style={estilos.reglonTitulo}>{item.nombre}</Text>
      <Text style={estilos.detalle}>{item.cedula}</Text>
    </View>
  </View>)
}

function nuevoEstudiante(nombre: string, cedula: string): Estudiante {
  return { nombre, 
    cedula, 
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    timestamp: Date.now()
  }
}

async function checkNFC() {
  const soportado = await NfcManager.isSupported();
  if (soportado) {
    await NfcManager.start();

    return true;
  }
  return false;
}

export default function nfcCheck() {

  var [listaEstudiantes, setLista] = React.useState<Estudiante[]>([])

  const agregarEstudiante = (e: Estudiante)=>{
    almacenarEstudiante(e).then((estudiante) => {
      if (estudiante) {
        setLista((listaVieja)=>{
          return [estudiante, ...listaVieja]
        })
        //Este toast solo funciona para android. Se recomienda buscar una alternativa en caso de usar iOS
        ToastAndroid.show('Estudiante anotado!', ToastAndroid.SHORT);
      }
    })
  }

  React.useEffect(() => {

    const iniciar = async () =>{

      var estudiantes = await obtenerEstudiantes()

      if(estudiantes){
        setLista(estudiantes)
      }

      var nfcSoportado = await checkNFC()

      if(nfcSoportado){
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: TagEvent) => {

          if (tag.ndefMessage.length == 2) {
            let datos: string[] = []
    
            for(var record of tag.ndefMessage){
              datos.push(Ndef.text.decodePayload(new Uint8Array(record.payload)))
            }
            
            agregarEstudiante(nuevoEstudiante(datos[0], datos[1]))
            
          }
        })

        await NfcManager.registerTagEvent()
      }
    }

    iniciar()

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
    }
  }, [])

  return (
    <View style={estilos.pantalla}>
      <Text style={estilos.titulo}>📋 Asistencias</Text>
      <Text style={estilos.subTitulo}>Acerca la etiqueta NFC para tomar la asistencia</Text>

      <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => {
            var e = nuevoEstudiante('George Lacroix', 'xxxxxxxx')
            agregarEstudiante(e)
          }}
        ><Text style={estilos.botones}>Asistencia Falsa</Text></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            borrarEstudiantes().then((exito) => {
              if (exito) {
                setLista([])
              }
            })
          }}
        ><Text style={estilos.botones}>Borrar Todo</Text></TouchableOpacity>
      </View>
      <FlatList data={listaEstudiantes} renderItem={({ item }) => (<ReglonEstudiante item={item} />)} />
    </View>
  );
}

var estilos = StyleSheet.create({
  titulo: {
    fontSize: 40,
    color: '#16f4d0',
    fontWeight: 'bold',
  },
  subTitulo: {
    fontSize: 20,
    color: '#429ea6',
    marginBottom: 15,
  },
  pantalla: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#153b50'
  },
  reglonTitulo: {
    fontSize: 15,
    color: '#153b50',
    fontWeight: 'bold'
  },
  reglonEstudiante: {
    backgroundColor: '#ecebe4',
    margin: 5,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2
  },
  botones: {
    color: '#cc998d'
  },
  detalle: {
    color: '#429ea6'
  }
})