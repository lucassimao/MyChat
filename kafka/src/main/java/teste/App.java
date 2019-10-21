package teste;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Properties;

import org.apache.avro.Schema;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.BinaryDecoder;
import org.apache.avro.io.BinaryEncoder;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DecoderFactory;
import org.apache.avro.io.EncoderFactory;
import org.apache.avro.reflect.ReflectData;
import org.apache.avro.reflect.ReflectDatumWriter;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

import io.confluent.kafka.serializers.AbstractKafkaAvroSerDeConfig;
import io.confluent.kafka.serializers.KafkaAvroSerializer;

public class App {
    private static final String TOPIC = "chats";

    private static <T> GenericRecord pojoToRecord(T model) throws IOException {
        Schema schema = ReflectData.get().getSchema(model.getClass());
 
        ReflectDatumWriter<T> datumWriter = new ReflectDatumWriter<>(schema);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
 
        BinaryEncoder encoder = EncoderFactory.get().binaryEncoder(outputStream, null);
        datumWriter.write(model, encoder);
        encoder.flush();
 
        DatumReader<GenericRecord> datumReader = new GenericDatumReader<>(schema);
        BinaryDecoder decoder = DecoderFactory.get().binaryDecoder(outputStream.toByteArray(), null);
 
        return datumReader.read(null, decoder);
    }

    public static void main(String[] args) throws IOException {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        // props.put(ProducerConfig.ACKS_CONFIG, "all");
        // props.put(ProducerConfig.RETRIES_CONFIG, 0);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, KafkaAvroSerializer.class);
        props.put(AbstractKafkaAvroSerDeConfig.SCHEMA_REGISTRY_URL_CONFIG, "http://localhost:8081");

        try (KafkaProducer<String, GenericRecord> producer = new KafkaProducer<String, GenericRecord>(props)) {

            for (long i = 0; i < 10; i++) {
                final Message msg = new Message("Lucas Simão","Hello kafka " + i);
                final ProducerRecord<String, GenericRecord> record = new ProducerRecord<String, GenericRecord>(TOPIC,null, pojoToRecord(msg));
                producer.send(record);
                System.out.println("msg " + i + " enviada");
                // Thread.sleep(100L);
            }

            producer.flush();
            System.out.printf("Successfully produced 10 messages to a topic called %s%n", TOPIC);

        } 

    }
}
