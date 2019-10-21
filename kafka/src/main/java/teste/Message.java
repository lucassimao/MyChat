package teste;

import java.io.Serializable;
import java.util.Objects;

import org.apache.avro.Schema;
import org.apache.avro.generic.IndexedRecord;

/**
 * Payment
 */
public class Message  {

    private String author, content;

    public Message() {
    }

    public Message(String author, String content) {
        this.author = author;
        this.content = content;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Message author(String author) {
        this.author = author;
        return this;
    }

    public Message content(String content) {
        this.content = content;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Message)) {
            return false;
        }
        Message message = (Message) o;
        return Objects.equals(author, message.author) && Objects.equals(content, message.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(author, content);
    }

    @Override
    public String toString() {
        return "{" + " author='" + getAuthor() + "'" + ", content='" + getContent() + "'" + "}";
    }

}