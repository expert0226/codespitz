public class WrapperTest {
    public static void main(String[] args) {
        Integer i = 5;
        Integer j = i;

        System.out.println(i.hashCode());
        System.out.println(j.hashCode());
    }
}
