<?php
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$mensaje = $_POST['mensaje'];

$para = 'propeto@gmail.com';
$titulo = 'Nuevo comentario de ' . $nombre;
$mensaje = 'Nombre: ' . $nombre . "\r\n" .
           'Correo: ' . $correo . "\r\n" .
           'Mensaje: ' . $mensaje;

if (mail($para, $titulo, $mensaje)) {
    echo 'El comentario se envió correctamente.';
} else {
    echo 'Error al enviar el comentario.';
}
?>
